import React, {StyleSheet, Dimensions, PixelRatio} from "react-native";
const {width, height, scale} = Dimensions.get("window"),
    vw = width / 100,
    vh = height / 100,
    vmin = Math.min(vw, vh),
    vmax = Math.max(vw, vh);

export default StyleSheet.create({
    "html": {
        "fontFamily": "sans-serif"
    },
    "jumbotron": {
        "backgroundImage": "url(/img/banner.jpg)",
        "backgroundRepeat": "repeat",
        "backgroundSize": "cover",
        "marginBottom": -10
    },
    "white-text-font": {
        "color": "#ffffff"
    },
    "jumbotron h1": {
        "color": "#ffffff"
    },
    "grey-bgd": {
        "backgroundColor": "#f3f1f1"
    },
    "jumbotron p": {
        "marginBottom": 15,
        "marginTop": 15,
        "fontSize": 15,
        "fontWeight": "400"
    },
    "glyphiconglyphicon-ok-circle": {
        "fontSize": 35
    },
    "element-margin-top": {
        "marginTop": 20
    },
    "element-margin-bottom": {
        "marginBottom": 20
    },
    "red-bgd": {
        "backgroundColor": "#c25b5f"
    },
    "red-light-bgd": {
        "backgroundColor": "#daa5a7"
    },
    "green-bgd": {
        "backgroundColor": "#19be50"
    }
});