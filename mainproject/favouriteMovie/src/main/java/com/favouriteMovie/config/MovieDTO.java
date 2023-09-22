package com.favouriteMovie.config;

import org.json.simple.JSONObject;

public class MovieDTO {

    private JSONObject jsonObject;

    public JSONObject getJsonObject() {
        return jsonObject;
    }

    public void setJsonObject(JSONObject jsonObject) {
        this.jsonObject = jsonObject;
    }
}
