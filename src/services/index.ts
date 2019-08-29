
import userRoutes from './user/routes';
import sessionRoutes from './session/routes';
import sectionRoutes from './section/routes';

export default  [
    ...userRoutes,
    ...sessionRoutes,
    ...sectionRoutes
];