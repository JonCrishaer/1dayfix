import Dashboard from './pages/Dashboard';
import Learn from './pages/Learn';
import Home from './pages/Home';
import __Layout from './Layout.jsx';


export const PAGES = {
    "Dashboard": Dashboard,
    "Learn": Learn,
    "Home": Home,
}

export const pagesConfig = {
    mainPage: "Dashboard",
    Pages: PAGES,
    Layout: __Layout,
};