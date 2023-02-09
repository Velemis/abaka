let scoreManager = {

    showScore: function () {
        let scoreTextElement = document.getElementById("scoreText");
        let searchParameters = this.getSearchParameters();
        if (typeof searchParameters["score"] !== "undefined") {
            scoreTextElement.innerHTML = "Your score: " + searchParameters["score"];
        }
    },

    getSearchParameters: function () {
        let parameterString = window.location.search.substring(1);
        return parameterString != null && parameterString !== "" ? this.transformToAssociativeArray(parameterString) : {};
    },

    transformToAssociativeArray: function (parameterString) {
        const params = {};
        const paramsArray = parameterString.split("&");
        for (let i = 0; i < paramsArray.length; i++) {
            const tempArray = paramsArray[i].split("=");
            params[tempArray[0]] = tempArray[1];
        }
        return params;
    }

}