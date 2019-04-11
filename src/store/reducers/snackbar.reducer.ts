import { Severity } from "../../enums";
import {
    /*AREA_ADD,*/ AREA_ADD_FAIL, AREA_ADD_ON_SERVER, AREA_ADD_SUCCESSFUL,
    /*AREA_DELETE,*/ AREA_DELETE_FAIL, AREA_DELETE_ON_SERVER, AREA_DELETE_SUCCESSFUL,
    /*AREA_SELECT,*/ AREA_SELECT_FAIL, /*AREA_SELECT_SUCCESSFUL,*/
    /*AREA_UPDATE,*/ AREA_UPDATE_FAIL, AREA_UPDATE_ON_SERVER, AREA_UPDATE_SUCCESSFUL,
    /*AREAS_LOAD,*/ AREAS_LOAD_FAIL, /*AREAS_LOAD_SUCCESSFUL,*/
    /*NEXT_CLOUD_CREDENTIALS_LOGIN,*/ NEXT_CLOUD_CREDENTIALS_LOGIN_FAIL, NEXT_CLOUD_CREDENTIALS_LOGIN_SUCCESSFUL,
    /*NEXT_CLOUD_CREDENTIALS_LOGOUT,*/ NEXT_CLOUD_CREDENTIALS_LOGOUT_FAIL, NEXT_CLOUD_CREDENTIALS_LOGOUT_SUCCESSFUL,
    /*PERIODIC_TASK_ADD,*/ PERIODIC_TASK_ADD_FAIL, PERIODIC_TASK_ADD_ON_SERVER, PERIODIC_TASK_ADD_SUCCESSFUL,
    /*PERIODIC_TASK_DELETE,*/ PERIODIC_TASK_DELETE_FAIL, PERIODIC_TASK_DELETE_ON_SERVER, PERIODIC_TASK_DELETE_SUCCESSFUL,
    /*PERIODIC_TASK_SELECT,*/ PERIODIC_TASK_SELECT_FAIL, /*PERIODIC_TASK_SELECT_SUCCESSFUL,*/
    /*PERIODIC_TASK_UPDATE,*/ PERIODIC_TASK_UPDATE_FAIL, PERIODIC_TASK_UPDATE_ON_SERVER, PERIODIC_TASK_UPDATE_SUCCESSFUL,
    /*PERIODIC_TASKS_LOAD,*/ PERIODIC_TASKS_LOAD_FAIL, /*PERIODIC_TASKS_LOAD_SUCCESSFUL,*/
    /*ROUTE_SET,*/
    SAVE_THEME,
    /*WIRELESS_SOCKET_ADD,*/ WIRELESS_SOCKET_ADD_FAIL, WIRELESS_SOCKET_ADD_ON_SERVER, WIRELESS_SOCKET_ADD_SUCCESSFUL,
    /*WIRELESS_SOCKET_DELETE,*/ WIRELESS_SOCKET_DELETE_FAIL, WIRELESS_SOCKET_DELETE_ON_SERVER, WIRELESS_SOCKET_DELETE_SUCCESSFUL,
    /*WIRELESS_SOCKET_SELECT,*/ WIRELESS_SOCKET_SELECT_FAIL, /*WIRELESS_SOCKET_SELECT_SUCCESSFUL,*/
    /*WIRELESS_SOCKET_UPDATE,*/ WIRELESS_SOCKET_UPDATE_FAIL, WIRELESS_SOCKET_UPDATE_ON_SERVER, WIRELESS_SOCKET_UPDATE_SUCCESSFUL,
    /*WIRELESS_SOCKETS_LOAD,*/ WIRELESS_SOCKETS_LOAD_FAIL, /*WIRELESS_SOCKETS_LOAD_SUCCESSFUL,*/
} from "../action-types";

const snackbarMessageReducer = (snackbarMessage: string = "", action: any): string => {
    switch (action.type) {
        case AREA_ADD_FAIL:
            return "Add of area failed!";
        case AREA_DELETE_FAIL:
            return "Delete of area failed!";
        case AREA_SELECT_FAIL:
            return "Select of area failed!";
        case AREA_UPDATE_FAIL:
            return "Update of area failed!";
        case AREAS_LOAD_FAIL:
            return "Load of areas failed!";
        case NEXT_CLOUD_CREDENTIALS_LOGIN_FAIL:
            return "Login failed!";
        case NEXT_CLOUD_CREDENTIALS_LOGOUT_FAIL:
            return "Logout failed!";
        case PERIODIC_TASK_ADD_FAIL:
            return "Add of periodic task failed!";
        case PERIODIC_TASK_DELETE_FAIL:
            return "Delete of periodic task failed!";
        case PERIODIC_TASK_SELECT_FAIL:
            return "Select of periodic task failed!";
        case PERIODIC_TASK_UPDATE_FAIL:
            return "Update of periodic task failed!";
        case PERIODIC_TASKS_LOAD_FAIL:
            return "Load of periodic tasks failed!";
        case SAVE_THEME:
            return action.payload.message;
        case WIRELESS_SOCKET_ADD_FAIL:
            return "Add of wireless socket failed!";
        case WIRELESS_SOCKET_DELETE_FAIL:
            return "Delete of wireless socket failed!";
        case WIRELESS_SOCKET_SELECT_FAIL:
            return "Select of wireless socket failed!";
        case WIRELESS_SOCKET_UPDATE_FAIL:
            return "Update of wireless socket failed!";
        case WIRELESS_SOCKETS_LOAD_FAIL:
            return "Load of wireless sockets failed!";
        case AREA_ADD_ON_SERVER:
            return "Add area on server...";
        case AREA_DELETE_ON_SERVER:
            return "Delete area on server...";
        case AREA_UPDATE_ON_SERVER:
            return "Update area on server...";
        case PERIODIC_TASK_ADD_ON_SERVER:
            return "Add periodic task on server...";
        case PERIODIC_TASK_DELETE_ON_SERVER:
            return "Delete periodic task on server...";
        case PERIODIC_TASK_UPDATE_ON_SERVER:
            return "Update periodic task on server...";
        case WIRELESS_SOCKET_ADD_ON_SERVER:
            return "Add wireless socket on server...";
        case WIRELESS_SOCKET_DELETE_ON_SERVER:
            return "Delete wireless socket on server...";
        case WIRELESS_SOCKET_UPDATE_ON_SERVER:
            return "Update wireless socket on server...";
        case AREA_ADD_SUCCESSFUL:
            return "Added area successfully";
        case AREA_DELETE_SUCCESSFUL:
            return "Deleted area successfully";
        case AREA_UPDATE_SUCCESSFUL:
            return "Updated area successfully";
        case NEXT_CLOUD_CREDENTIALS_LOGIN_SUCCESSFUL:
            return "Successfully logged in";
        case NEXT_CLOUD_CREDENTIALS_LOGOUT_SUCCESSFUL:
            return "Successfully logged out";
        case PERIODIC_TASK_ADD_SUCCESSFUL:
            return "Added periodic task successfully";
        case PERIODIC_TASK_DELETE_SUCCESSFUL:
            return "Deleted periodic task successfully";
        case PERIODIC_TASK_UPDATE_SUCCESSFUL:
            return "Updated periodic task successfully";
        case WIRELESS_SOCKET_ADD_SUCCESSFUL:
            return "Added wireless socket successfully";
        case WIRELESS_SOCKET_DELETE_SUCCESSFUL:
            return "Deleted wireless socket successfully";
        case WIRELESS_SOCKET_UPDATE_SUCCESSFUL:
            return "Updated wireless socket successfully";
        default:
            return "";
    }
};

const snackbarSeverityReducer = (snackbarSeverity: Severity = Severity.Null, action: any): Severity => {
    switch (action.type) {
        case AREA_ADD_FAIL:
        case AREA_DELETE_FAIL:
        case AREA_SELECT_FAIL:
        case AREA_UPDATE_FAIL:
        case AREAS_LOAD_FAIL:
        case NEXT_CLOUD_CREDENTIALS_LOGIN_FAIL:
        case NEXT_CLOUD_CREDENTIALS_LOGOUT_FAIL:
        case PERIODIC_TASK_ADD_FAIL:
        case PERIODIC_TASK_DELETE_FAIL:
        case PERIODIC_TASK_SELECT_FAIL:
        case PERIODIC_TASK_UPDATE_FAIL:
        case PERIODIC_TASKS_LOAD_FAIL:
        case WIRELESS_SOCKET_ADD_FAIL:
        case WIRELESS_SOCKET_DELETE_FAIL:
        case WIRELESS_SOCKET_SELECT_FAIL:
        case WIRELESS_SOCKET_UPDATE_FAIL:
        case WIRELESS_SOCKETS_LOAD_FAIL:
            return Severity.Error;
        case AREA_ADD_ON_SERVER:
        case AREA_DELETE_ON_SERVER:
        case AREA_UPDATE_ON_SERVER:
        case PERIODIC_TASK_ADD_ON_SERVER:
        case PERIODIC_TASK_DELETE_ON_SERVER:
        case PERIODIC_TASK_UPDATE_ON_SERVER:
        case SAVE_THEME:
        case WIRELESS_SOCKET_ADD_ON_SERVER:
        case WIRELESS_SOCKET_DELETE_ON_SERVER:
        case WIRELESS_SOCKET_UPDATE_ON_SERVER:
            return Severity.Info;
        case AREA_ADD_SUCCESSFUL:
        case AREA_DELETE_SUCCESSFUL:
        case AREA_UPDATE_SUCCESSFUL:
        case NEXT_CLOUD_CREDENTIALS_LOGIN_SUCCESSFUL:
        case NEXT_CLOUD_CREDENTIALS_LOGOUT_SUCCESSFUL:
        case PERIODIC_TASK_ADD_SUCCESSFUL:
        case PERIODIC_TASK_DELETE_SUCCESSFUL:
        case PERIODIC_TASK_UPDATE_SUCCESSFUL:
        case WIRELESS_SOCKET_ADD_SUCCESSFUL:
        case WIRELESS_SOCKET_DELETE_SUCCESSFUL:
        case WIRELESS_SOCKET_UPDATE_SUCCESSFUL:
            return Severity.Success;
        default:
            return Severity.Null;
    }
};

export default {
    snackbarMessageReducer,
    snackbarSeverityReducer,
};
