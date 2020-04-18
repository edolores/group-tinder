package com.google.sps.data;

public final class AnswersClass {
    private final String answer1;
    private final String answer2;
    private final String answer3;
    private final String password;

    public AnswersClass() {
        this.answer1 = "";
        this.answer2 = "";
        this.answer3 = "";
        this.password = "";
    }
    public AnswersClass(String answer1, String answer2, String answer3, String password) {
        this.answer1 = answer1;
        this.answer2 = answer2;
        this.answer3 = answer3;
        this.password = password;
    }
    public String getAnswer1(){
        return this.answer1;
    }
    public String getAnswer2(){
        return this.answer2;
    }
    public String getAnswer3(){
        return this.answer3;
    }
    public String getPassword(){
        return this.password;
    }
}