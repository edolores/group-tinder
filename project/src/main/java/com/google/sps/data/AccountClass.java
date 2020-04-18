package com.google.sps.data;

public final class AccountClass {
    private final String username;
    private final String password;

    public AccountClass(String username, String password) {
        this.username = username;
        this.password = password;
    }
    public String getUsername(){
        return this.username;
    }
    public String getPassword(){
        return this.password;
    }
}