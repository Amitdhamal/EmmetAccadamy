import { Routes } from '@angular/router';
import { Home } from './features/home/home';
import { ContactForm } from './components/contact-form/contact-form';
import { Notices } from './features/notices/notices';
import { Events } from './features/events/events';
import { Gallery } from './features/gallery/gallery';
import { Teachers } from './features/teachers/teachers';
import { About } from './pages/about/about';

export const routes: Routes = [
    { 'path': '', component: Home},
    { 'path': 'admission', component: ContactForm },
    { 'path': 'notices', component: Notices },
    { 'path': 'events', component: Events },
    { 'path': 'gallery', component: Gallery },
    { 'path': 'teachers', component: Teachers },
    { 'path': 'contact', component: ContactForm },
    { 'path': 'about', component: About },

];
