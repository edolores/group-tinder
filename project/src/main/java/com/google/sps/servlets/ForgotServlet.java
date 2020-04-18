package com.google.sps.servlets;
import com.google.sps.data.SecurityQuestionsClass;

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

@WebServlet("/forgot")
public class ForgotServlet extends HttpServlet{
    @Override
    public void doGet(HttpServletRequest request, HttpServletResponse response) throws IOException{
        String username = request.getParameter("username");
        if (new SignUpServlet().isUniqueUser(username))
            response.getWriter().println(new Gson().toJson(""));
        else{
            SecurityQuestionsClass questions = getQuestionsForUser(username);
            Gson gson = new Gson();
            String jsonString = gson.toJson(questions);
            response.setContentType("application/json; charset=UTF-8");
            response.setCharacterEncoding("UTF-8");
            response.getWriter().println(jsonString);
        }
    }
    protected SecurityQuestionsClass getQuestionsForUser(String username){
        Query query = new Query("UserCredentials").addSort("username", SortDirection.ASCENDING);
        DatastoreService datastore = DatastoreServiceFactory.getDatastoreService();
        PreparedQuery results = datastore.prepare(query);
        SecurityQuestionsClass questions = new SecurityQuestionsClass();
        
        for (Entity entity : results.asIterable()) {
            long id = entity.getKey().getId();
            String user = (String) entity.getProperty("username");
            if (user.equals(username)){
                String questionOne = (String) entity.getProperty("securityQ1");
                String questionTwo = (String) entity.getProperty("securityQ2");
                String questionThree = (String) entity.getProperty("securityQ3");
                questions = new SecurityQuestionsClass(questionOne, questionTwo, questionThree);
            }
        }
        return questions;
    }
}