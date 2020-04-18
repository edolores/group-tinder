package com.google.sps.servlets;
import com.google.sps.data.AnswersClass;

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

@WebServlet("/password")
public class GetPasswordServlet extends HttpServlet{
    @Override
    public void doGet(HttpServletRequest request, HttpServletResponse response) throws IOException{
        String username = request.getParameter("username");
        AnswersClass user = getUser(username);
        String password = getPassword(user, request);
        response.getWriter().println(password);
    }
    private AnswersClass getUser(String username){
        Query query = new Query("UserCredentials").addSort("username", SortDirection.ASCENDING);
        DatastoreService datastore = DatastoreServiceFactory.getDatastoreService();
        PreparedQuery results = datastore.prepare(query);
        AnswersClass userData = new AnswersClass();
        
        for (Entity entity : results.asIterable()) {
            String user = (String) entity.getProperty("username");
            if (user.equals(username)){
                String a1 = (String) entity.getProperty("answerQ1");
                String a2 = (String) entity.getProperty("answerQ2");
                String a3 = (String) entity.getProperty("answerQ3");
                String password = (String) entity.getProperty("password");
                userData = new AnswersClass(a1, a2, a3, password);
            }
        }
        return userData;
    }
    private String getPassword(AnswersClass user, HttpServletRequest request){
        String answerOne = request.getParameter("answerQ1");
        String answerTwo = request.getParameter("answerQ2");
        String answerThree = request.getParameter("answerQ3");
        String a1 = user.getAnswer1();
        String a2 = user.getAnswer2();
        String a3 = user.getAnswer3();
        if (answerOne.equals(a1) && answerTwo.equals(a2) && answerThree.equals(a3))
            return user.getPassword();
        else
            return "";
    }
}