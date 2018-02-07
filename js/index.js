// DATA MODEL CONTROLLER
let dataController = (function(){

  //function constructors to hold income and expenses data
  //Note: Always begin constructors with capital letters
  let Expenses = function (id, description, value) {
    this.id = id;
    this.description = description;
    this.value = value;
  };

  let Income = function (id, description, value) {
    this.id = id;
    this.description = description;
    this.value = value;
  };

  //store data in obj
  let data  = {
    allItems: {
      expenses: [],
      income: []
    },
    total: {
      expenses: 0,
      income: 0
    },
    budget: 0,
    percentage: -1 // -1 means the value does not exist
  };

  calculateTotal = function (type) {
    let sum = 0;
    data.allItems[type].forEach(function(cur, i, arr){
      sum += cur.value;
    });
    data.total[type] = sum;
  }

  return {
    addItem: function(type, description, value) {
      let newItem, ID;
      ID = 0;

      //Creates new id
      // minus 1 from the array length because array starts from 0
      // this "data.allItems[type][data.allItems[type].length - 1]" is equivalent
      // to expenses[expenses.length - 1] to get the last element in the array
      // the id comes from the id attribute set on the obj
      if (data.allItems[type].length > 0 ) {
        ID = data.allItems[type][data.allItems[type].length - 1].id + 1;
      } else {
        ID = 0;
      }

      // create new obj based on whether it's income or expenses
      if (type === "income") {
        newItem = new Income(ID, description, value);
      } else if (type === "expenses") {
        newItem = new Expenses(ID, description, value);
      }

      // add new obj to data structure
      data.allItems[type].push(newItem);

      // return the new obj
      return newItem;
    },

    deleteItem: function (type, id) {
      let ids, index;

      // map returns a array, e.g ids will return something like [1,4,5,6,7]
      // data.allItems[type] is e.g data.allItems.expenses
      ids = data.allItems[type].map(function (currentItem){
        return currentItem.id;  // return an array with all ids of expenses or income

      });

      // get index of id
      index = ids.indexOf(id);

      // -1 means index does not exist
      if (index !== -1) {
        data.allItems[type].splice(index, 1); // remove item from array
      }
    },

    calculateBudget: function (){
      // calculate total income or expenses
      calculateTotal('income');
      calculateTotal('expenses');

      // calculate the budget which is income - expenses
      data.budget = data.total.income - data.total.expenses;

      // calculate the percentage of income against expenses
      if (data.total.income > 0 && data.total.expenses > 0) {
        data.percentage = Math.round((data.total.income / data.total.expenses) * 100);
      } else {
        data.percentage = -1;
      }

    },

    getBudget: function () {
      return {
        budget: data.budget,
        percentage: data.percentage,
        totalIncome: data.total.income,
        totalExpenses: data.total.expenses
      };
    },

    testing: function (){
      console.log(data);
    }
  };

})();

// UI CONTROLLER
let uiController = (function() {

  //private methods,obj and fields that cannot be accessed publicly
  //Obj to hold all dom strings for code management
  let DomStrings = {
    typeDom: ".add_type",
    descriptionDom: "#add_description",
    valueDom: "#add_value",
    addButtonDom: "#add-button",
    incomeList: ".income-list",
    expensesList: ".expenses-list",
    availableBudget: "#available-budget",
    totalIncome: "#total-income",
    totalExpenses: "#total-expenses",
    percentage: "#percentage",
    parentContainer: '.parent-container'
  };

 //(note: this is public method and fields that can be accessed publicly)
 return {
   //return user input
   getUserInput: function () {
     return {
       type: document.querySelector(DomStrings.typeDom).value, //can be income or expenses
       description: document.querySelector(DomStrings.descriptionDom).value,
       value: parseFloat(document.querySelector(DomStrings.valueDom).value)
     };
   },

   //return dom strings
   getDomStrings: function () {
     return DomStrings;
   },

   //insert data into html and display
   addItemToTable: function (obj, type, percentage) {
     let html, newHtml, element;

     //create Html string with placeholder text
     if (type === "income"){

       element = DomStrings.incomeList;
       html = '<tr id="income-%id%"><td>%description%</td><td><span>+</span> %value%</td><td><div><button type="button" class="btn btn-primary btn-sm glyphicon glyphicon-trash"></button></div></td></tr>';

     } else if (type === "expenses"){

       element = DomStrings.expensesList;
       //console.log (element + " " + "type is " + type);
       html = '<tr id="expenses-%id%"><td>%description%</td><td><span>-</span> %value%</td><td style="width: 50px"><p class="text-center white-text-font red-light-bgd">%percentage%</p></td><td><div><button type="button" class="btn btn-primary btn-sm glyphicon glyphicon-trash"></button></div></td></tr>';
     }
     //console.log (obj);
     // replace placeholder text with actual input value
     newHtml = html.replace('%id%', obj.id);
     newHtml = newHtml.replace('%description%', obj.description);
     newHtml = newHtml.replace('%value%', obj.value);
     newHtml = newHtml.replace('%percentage%', percentage);

     //insert html into Dom
     document.querySelector(element).insertAdjacentHTML('beforeend', newHtml);
   },

   // clears the input field and set focus to the description field
   clearInputFields: function () {
     let inputFieldsList, inputFieldsArray;

     inputFieldsList = document.querySelectorAll(DomStrings.descriptionDom + "," +
     DomStrings.valueDom);
     //console.log(inputFieldsList);
     inputFieldsArray = Array.prototype.slice.call(inputFieldsList);
     //console.log(inputFieldsArray);

     inputFieldsArray.forEach(function (currentElement, currentElementIndex, array){
       //console.log(currentElement);
       currentElement.value = "";

       inputFieldsArray[0].focus();
     });
   },

   // add budget, percentage, total income and expenses to UI
   displayBudget: function (obj) {

       document.querySelector(DomStrings.totalExpenses).textContent = "- " + obj.totalExpenses;
       document.querySelector(DomStrings.totalIncome).textContent = "+ " + obj.totalIncome;
       document.querySelector(DomStrings.availableBudget).textContent = obj.budget;
      if (obj.percentage > 0) {
           document.querySelector(DomStrings.percentage).textContent = obj.percentage + "%";
      } else {
           document.querySelector(DomStrings.percentage).textContent = "--";
      }

   }
 };


})();

let updateBudget = function () {
  // 1. calculate the budget
  dataController.calculateBudget();

  // 2. get the budget
  let budget = dataController.getBudget();

  // 3. add the budget to the ui
  //console.log(budget);
  uiController.displayBudget(budget);
}

let getAndAddUserInput = function (){
  // 1. Get user's input
  let userInput = uiController.getUserInput();
  //console.log(uiController.getUserInput());
  if (userInput.description !== "" && !isNaN(userInput.value) && userInput.value > 0) {
    // 2. add it to the dataController
    let newItem = dataController.addItem(userInput.type, userInput.description, userInput.value);

    // 3. add it to the UI and clear fields for new input
    uiController.addItemToTable(newItem, userInput.type, dataController.getBudget().percentage);

    // 4. clears fields for new input
    uiController.clearInputFields();
    //console.log('it works');

    // 5. calculate and update budget
    updateBudget();
  }

};

let deleteInputItem = function (event){
  let targetItem, targetItemId, targetItemType, targetItemArr;
  // transverse the node to the parent node and select id of parent node
  targetItem = event.target.parentNode.parentNode.parentNode.id;
  if (targetItem){
    targetItemArr = targetItem.split("-"); //split income-id & expenses-id at the "-" e.g income-1 to become income and 1
    targetItemType = targetItemArr[0];
    targetItemId = parseInt(targetItemArr[1]); //convert it to integer

    console.log(targetItemType +" "+ targetItemId);

    // 1. delete ite, from UI
    dataController.deleteItem(targetItemType, targetItemId);
  }
}

// THE GLOBAL APP CONTROLLER
let budgetController = (function(dataControl, uiControl) {

  let setUpEventListeners = function () {
    //get dom obj
    let Dom = uiControl.getDomStrings();

    // if user clicks add button
    document.querySelector(Dom.addButtonDom).addEventListener("click", getAndAddUserInput);
    document.querySelector(Dom.parentContainer).addEventListener("click", deleteInputItem);

    // if user presses enter key
    document.addEventListener("keypress", function(event){
      if (event.keycode === 13 || event.which === 13){
        //console.log(event);
        getAndAddUserInput();
      }
    });
  };

  return {
    init: function (){
        //console.log("running ...");
        setUpEventListeners();
        uiControl.displayBudget(
          {budget: 0,
          percentage: 0,
          totalIncome: 0,
          totalExpenses: 0}
        );
    }
  };

})(dataController, uiController);

budgetController.init();
