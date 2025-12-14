package com.example.demo.util;

public class LogMessages {

    // Auth messages
    public static final String LOGIN_REQUEST = "Login request received for email: {}";
    public static final String LOGIN_ATTEMPT = "Attempting login for email={}";
    public static final String LOGIN_SUCCESS = "Login successful for email={} roles={}";
    public static final String LOGIN_FAILED_NOT_FOUND = "Login failed: user not found for email={}";
    public static final String LOGIN_FAILED_WRONG_PASSWORD = "Login failed: incorrect password for email={}";
    
    public static final String REGISTER_REQUEST = "Registration request received for email: {}";
    public static final String REGISTER_ATTEMPT = "Attempting registration for email={}";
    public static final String REGISTER_SUCCESS = "Registration successful for email={} roles={}";
    public static final String REGISTER_FAILED_EXISTS = "Registration failed: email already exists - email={}";
    public static final String LOGIN_FAILED = "Login failed for email: {}";
    public static final String REGISTER_FAILED = "Registration failed for email: {}";

    // Poster messages
    public static final String POSTER_FETCH_ALL = "Fetching all posters";
    public static final String POSTER_FETCH_BY_ID = "Fetching poster with id={}";
    public static final String POSTER_NOT_FOUND = "Poster not found with id={}";
    
    public static final String POSTER_CREATE = "Creating poster with title='{}'";
    public static final String POSTER_CREATED = "Poster created with id={} title='{}'";
    public static final String POSTER_CREATE_FAILED = "Failed to create poster: invalid DTO";
    
    public static final String POSTER_UPDATE = "Updating poster id={} with title='{}'";
    public static final String POSTER_UPDATED = "Poster updated id={} title='{}'";
    public static final String POSTER_UPDATE_FAILED = "Poster update failed: not found id={}";
    
    public static final String POSTER_DELETE = "Deleting poster id={}";
    public static final String POSTER_DELETED = "Poster deleted id={}";
    public static final String POSTER_DELETE_FAILED = "Delete failed: poster not found id={}";
     // Poster messages
    public static final String FETCHING_ALL_POSTERS = "Fetching all posters";
    public static final String FETCHING_POSTER_BY_ID = "Fetching poster with id={}";
    public static final String POSTER_NOT_FOUND_BY_ID = "Poster not found with id={}";
    public static final String CREATING_POSTER = "Creating poster with title='{}'";
    public static final String FAILED_TO_CREATE_POSTER = "Failed to create poster with title='{}'";
    public static final String UPDATING_POSTER = "Updating poster id={} with title='{}'";
    public static final String FAILED_TO_UPDATE_POSTER = "Failed to update poster: not found id={}";
    public static final String DELETING_POSTER = "Deleting poster id={}";
    public static final String FAILED_TO_DELETE_POSTER = "Failed to delete poster: not found id={}";
}
