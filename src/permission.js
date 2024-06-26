import router from './router';
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';
import { UserModule } from '@/store/modules/user';
NProgress.configure({ showSpinner: false });
const whiteList = ['/login'];
router.beforeEach(async (to, _, next) => {
    // Start progress bar
    NProgress.start();
    // Determine whether the user has logged in
    if (localStorage.getItem(`token`)!=null) {
        if (to.path === '/login') {
            // If is logged in, redirect to the home page
            next({ path: '/' });
            NProgress.done();
        }
        else {
            // Check whether the user has obtained his permission roles
            // if (UserModule.roles.length === 0) {
            //   try {
            //     // Get user info, including roles
            //     await UserModule.GetUserInfo()
            //     // Set the replace: true, so the navigation will not leave a history record
            //     next({ ...to, replace: true })
            //   } catch (err) {
            //     // Remove token and redirect to login page
            //     UserModule.ResetToken()
            //     Message.error(err || 'Has Error')
            //     next(`/login?redirect=${to.path}`)
            //     NProgress.done()
            //   }
            // } else {
            //   next()
            // }
            next();
        }
    }
    else {
        // Has no token
        if (whiteList.indexOf(to.path) !== -1) {
            // In the free login whitelist, go directly
            next();
        }
        else {
            // Other pages that do not have permission to access are redirected to the login page.
            next(`/login?redirect=${to.path}`);
            NProgress.done();
        }
    }
});
router.afterEach((to) => {
    // Finish progress bar
    NProgress.done();
    // set page title
    document.title = to.meta.title;
});
//# sourceMappingURL=permission.js.map
