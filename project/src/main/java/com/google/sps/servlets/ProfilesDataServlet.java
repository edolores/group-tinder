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
import java.util.*; 
import com.google.gson.Gson;

/** Servlet that returns some example content. TODO: modify this file to handle comments data */
@WebServlet("/profiles")
public class ProfilesDataServlet extends HttpServlet {

  private String username = "";

  @Override
  public void doGet(HttpServletRequest request, HttpServletResponse response) throws IOException {
    Query query = new Query("Comment").addSort("Timestamp", SortDirection.ASCENDING);
    
    DatastoreService datastore = DatastoreServiceFactory.getDatastoreService();
    PreparedQuery results = datastore.prepare(query);

    ArrayList<String> list = new ArrayList<String>();
    for(Entity entity: results.asIterable()){
        StringBuilder str = new StringBuilder();
        String com = (String) entity.getProperty("Username");
        if(com == null){
            str.append("");
        }
        else{
            str.append(com);
            str.append(": ");
        }
        com = (String) entity.getProperty("Content");
        str.append(com);
        list.add(str.toString());
    }

    response.setContentType("application/json");
    Gson gson = new Gson();
    String comments = gson.toJson(list);

    /*Create commemtns*/
    StringBuilder json = new StringBuilder();
    json.append("{\"username\":\"");
    json.append(username);
    json.append("\", \"comments\": ");
    json.append(comments);
    json.append("}");
    
    response.getWriter().println(json);
  }

  @Override
  public void doPost(HttpServletRequest request, HttpServletResponse response) throws IOException {

    String nameInput = request.getParameter("name");

    //if the username is different and isn't empty
    if((nameInput != username) && (nameInput.length() != 0)){
        username = nameInput;
    }
    else if((nameInput.length()) == 0 && (username.length() == 0)){
      response.setContentType("text/html");
      response.getWriter().println("Please enter a non-empty username");
      return;
    }

    // Get the input from the form.
    String input = request.getParameter("text-input");

    //if input is empty ask them to enter again
    if (input.length() == 0) {
      response.setContentType("text/html");
      response.getWriter().println("Please enter a valid string");
      return;
    }

    long timestamp = System.currentTimeMillis();

    Entity comEntity = new Entity("Comment");
    comEntity.setProperty("Username", username);
    comEntity.setProperty("Content", input);
    comEntity.setProperty("Timestamp", timestamp);

    DatastoreService datastore = DatastoreServiceFactory.getDatastoreService();
    datastore.put(comEntity);

    // Redirect back to the HTML page.
    response.sendRedirect("/index.html");
  }
}
