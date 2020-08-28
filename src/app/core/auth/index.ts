// SERVICES
export { AuthService } from './_services';
export { AuthNoticeService } from './auth-notice/auth-notice.service';


// ACTIONS
export {
    Login,
    Logout,
    Register,
    UserRequested,
    UserLoaded,
    AuthActionTypes,
    AuthActions
} from './_actions/auth.actions';
export {
    AllPermissionsRequested,
    AllPermissionsLoaded,
    PermissionActionTypes,
    PermissionActions
} from './_actions/permission.actions';


// EFFECTS
export { AuthEffects } from './_effects/auth.effects';
// REDUCERS
export { authReducer } from './_reducers/auth.reducers';
export { permissionsReducer } from './_reducers/permission.reducers';

// SELECTORS
export {
    isLoggedIn,
    isLoggedOut,
    isUserLoaded,
    currentAuthToken,
     currentUser,
    // currentUserRoleIds,
    // currentUserPermissionsIds,
    // currentUserPermissions,
    checkHasUserPermission
} from './_selectors/auth.selectors';
// export {
//     selectPermissionById,
//     selectAllPermissions,
//     selectAllPermissionsIds,
//     allPermissionsLoaded
// } from './_selectors/permission.selectors';

// GUARDS
export { AuthGuard } from './_guards/auth.guard';
export { ModuleGuard } from './_guards/module.guard';

// MODELS
//export { Permission } from './_models/permission.model';
export { AuthNotice } from './auth-notice/auth-notice.interface';
//export {Projects} from './_models/projects.model'
//export { AuthDataContext } from './_server/auth.data-context';
