import Community from './pages/Community';
import Contact from './pages/Contact';
import Dashboard from './pages/Dashboard';
import Home from './pages/Home';
import Learn from './pages/Learn';
import Profile from './pages/Profile';
import __Layout from './Layout.jsx';


export const PAGES = {
    "Community": Community,
    "Contact": Contact,
    "Dashboard": Dashboard,
    "Home": Home,
    "Learn": Learn,
    "Profile": Profile,
}

export const pagesConfig = {
    mainPage: "Home",
    Pages: PAGES,
    Layout: __Layout,
};