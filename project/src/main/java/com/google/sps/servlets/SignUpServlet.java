// Copyright 2019 Google LLC
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     https://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

package com.google.sps.servlets;
import com.google.sps.data.AccountClass;

import com.google.appengine.api.datastore.DatastoreService;
import com.google.appengine.api.datastore.DatastoreServiceFactory;
import com.google.appengine.api.datastore.Entity;
import com.google.appengine.api.datastore.PreparedQuery;
import com.google.appengine.api.datastore.Query;
import com.google.appengine.api.datastore.Query.SortDirection;

import java.io.IOException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import java.util.Arrays;
import java.util.ArrayList;
import java.util.Map;
import java.util.HashMap;
import java.util.HashMap;

import java.util.regex.Matcher;
import java.util.regex.Pattern;

import com.google.gson.Gson;

import java.util.Enumeration;

@WebServlet("/sign-up")
public class SignUpServlet extends HttpServlet{
    @Override
    public void doGet(HttpServletRequest request, HttpServletResponse response) throws IOException {
        Map<String, String> requestElements = mapMaker(request.getParameterMap());
        String username = requestElements.get("username");
        String password = requestElements.get("password");
        
        boolean validUsername = validUsername(username); 
        boolean isUniqueUser = isUniqueUser(username); 
        boolean validPassword = validPassword(password); 

        if (validUsername && isUniqueUser && validPassword){
            response.getWriter().println("Successfully created account.");
            makeNewAccount(requestElements);
        }
        else if (!validUsername)
            response.getWriter().println("Invalid username. \nREQUIREMENTS: \n- 5 to 24 characters");
        else if (!isUniqueUser)
            response.getWriter().println("Username is not available. Returning user? Press the \"Login\" button to login.");
        else
            response.getWriter().println("Invalid password. \nREQUIREMENTS:\n- 5 to 24 characters\n- 1 uppercase letter\n- 1 lowercase letter\n- 1 number\n- 1 special character\n");
    }
    private boolean validUsername(String username){
        return username.length() >= 5 && username.length() <= 24;
    }
    protected boolean isUniqueUser(String username){
        for (AccountClass account : new LoginServlet().getAllAccounts())
            if (account.getUsername().equals(username)) return false;
        return true;
    }
    private boolean validPassword(String password){
        if (password.length() < 5 || password.length() > 24)
            return false;
            
        String [] patterns = {".*[a-z]+.*", ".*[A-Z]+.*", ".*[0-9]+.*", ".*[^a-zA-Z0-9]+.*"};
        
        for (String singlePattern : patterns){
            Pattern pattern = Pattern.compile(singlePattern);
            Matcher matcher = pattern.matcher(password);
            if (!matcher.matches())
                return false;
        }
        return true;
    }
    private void makeNewAccount(Map <String, String> mapOfValues){
        Entity credentialsEntity = new Entity("UserCredentials");
        for (Object key : mapOfValues.keySet())
            credentialsEntity.setProperty((String)key, (String)mapOfValues.get(key));
        DatastoreService datastore = DatastoreServiceFactory.getDatastoreService();
        datastore.put(credentialsEntity);
    }
    private Map<String, String> mapMaker(Map<String, String[]> map){
        Map<String, String> newMap = new HashMap<String, String>();
        for (Object key : map.keySet())
            newMap.put((String)key, (String)map.get(key)[0]);
        return newMap;
    }
}