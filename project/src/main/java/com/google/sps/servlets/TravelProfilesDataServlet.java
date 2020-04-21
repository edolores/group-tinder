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

/* Servlet that handles user submitting names for groupchat*/
@WebServlet("/travel-group-names")
public class TravelProfilesDataServlet extends HttpServlet {

  @Override
  public void doGet(HttpServletRequest request, HttpServletResponse response) throws IOException {
    Query query = new Query("TravelProfiles");
    
    DatastoreService datastore = DatastoreServiceFactory.getDatastoreService();
    PreparedQuery results = datastore.prepare(query);

    // Retrieve usernames that are in the groupchat
    ArrayList<String> list = new ArrayList<String>();
    for(Entity entity: results.asIterable()){
        String uname = (String) entity.getProperty("Username");
        list.add(uname);
    }

    response.setContentType("application/json");
    Gson gson = new Gson();
    String unames = gson.toJson(list);

    // Create json for usernames
    StringBuilder json = new StringBuilder();
    json.append("{\"usernames\": ");
    json.append(unames);
    json.append("}");
    
    response.getWriter().println(json);
  }

  @Override
  public void doPost(HttpServletRequest request, HttpServletResponse response) throws IOException {
    // Using the string of names, create a list of the usernames
    String nameInput = request.getParameter("profile-name-list");
    List<String> profileNameList = new ArrayList<String>(Arrays.asList(nameInput.split(",")));

    DatastoreService datastore = DatastoreServiceFactory.getDatastoreService();

    // Add a new entity for each username
    for(String pName: profileNameList){
        Entity travelEntity = new Entity("TravelProfiles");
        travelEntity.setProperty("Username", pName);
        datastore.put(travelEntity);
    }

    // Redirect back to the chat page.
    response.sendRedirect("/travel-chat.html");
  }
}
