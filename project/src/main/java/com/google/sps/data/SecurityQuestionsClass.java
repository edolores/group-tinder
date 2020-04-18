package com.google.sps.data;

public final class SecurityQuestionsClass {
    private final String securityQ1;
    private final String securityQ2;
    private final String securityQ3;

    public SecurityQuestionsClass() {
        this.securityQ1 = "";
        this.securityQ2 = "";
        this.securityQ3 = "";
    }

    public SecurityQuestionsClass(String securityQ1, String securityQ2, String securityQ3) {
        this.securityQ1 = securityQ1;
        this.securityQ2 = securityQ2;
        this.securityQ3 = securityQ3;
    }
}