import {NotificationManager} from 'react-notifications';
import 'react-notifications/lib/notifications.css';
//import { useSession } from  'react-use-session';


export function createNotification(type,message,title='Mijneets')
{
   switch (type) 
    {
      case 'info':
        NotificationManager.info(message,title,3000);
        break;
      case 'success':
        NotificationManager.success(message,title,3000);
        break;
      case 'warning':
        NotificationManager.warning(message,title,3000);
        break;
      case 'error':
        NotificationManager.error(message,title,3000);
        break;
    }
    
}