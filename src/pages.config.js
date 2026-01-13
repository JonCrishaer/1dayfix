import Dashboard from './pages/Dashboard';
import Home from './pages/Home';
import Learn from './pages/Learn';
import Profile from './pages/Profile';
import Community from './pages/Community';
import Contact from './pages/Contact';
import __Layout from './Layout.jsx';


export const PAGES = {
    "Dashboard": Dashboard,
    "Home": Home,
    "Learn": Learn,
    "Profile": Profile,
    "Community": Community,
    "Contact": Contact,
}

export const pagesConfig = {
    mainPage: "Dashboard",
    Pages: PAGES,
    Layout: __Layout,
};