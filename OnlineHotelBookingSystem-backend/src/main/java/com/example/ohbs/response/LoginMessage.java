package com.example.ohbs.response;

public class LoginMessage {
    private String message;
    private boolean success;
    private String role;
    private Long userId;

    // Constructors, getters, and setters
    

    public String getMessage() {
        return message;
    }

    public LoginMessage(String message, boolean success, String role, Long userId) {
		super();
		this.message = message;
		this.success = success;
		this.role = role;
		this.userId = userId;
	}

	public void setMessage(String message) {
        this.message = message;
    }

    public boolean isSuccess() {
        return success;
    }

    public void setSuccess(boolean success) {
        this.success = success;
    }

    public String getRole() {
        return role;
    }

    public void setRole(String role) {
        this.role = role;
    }

	public Long getUserId() {
		return userId;
	}

	public void setUserId(Long userId) {
		this.userId = userId;
	}
    
}
