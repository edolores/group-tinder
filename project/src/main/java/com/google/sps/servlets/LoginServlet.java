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

import com.google.gson.Gson;
import java.util.ArrayList;
import java.util.Objects;

import java.util.Enumeration;

@WebServlet("/login")
public class LoginServlet extends HttpServlet {
    @Override
    public void doGet(HttpServletRequest request, HttpServletResponse response) throws IOException {
        String username = request.getParameter("username");
        String password = request.getParameter("password");

        if (accessGranted(username, password))
            response.getWriter().println("/categories.html");
        else
            response.getWriter().println("/index.html");
    
    }
    private boolean accessGranted(String username, String password){
        for (AccountClass account : getAllAccounts())
            if (username.equals(account.getUsername()) && password.equals(account.getPassword())) return true;
        return false;
    }
    protected ArrayList<AccountClass> getAllAccounts(){
        PreparedQuery results = getResultsFromDatastore();
        ArrayList<AccountClass> accounts = new ArrayList<>();
        
        for (Entity entity : results.asIterable()) {
            String username = (String) entity.getProperty("username");
            String password = (String) entity.getProperty("password");
            accounts.add(new AccountClass(username, password));
        }
        return accounts;
    }
    protected PreparedQuery getResultsFromDatastore(){
        Query query = new Query("UserCredentials").addSort("username");
        DatastoreService datastore = DatastoreServiceFactory.getDatastoreService();
        return datastore.prepare(query);
    }
}