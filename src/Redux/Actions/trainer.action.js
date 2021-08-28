import { createActions } from 'reduxsauce';

const { Types, Creators } = createActions({
    trainerList: ['details'],
    trainerListSuccess: ['list', 'pages'],
    trainerListFailure: ['err_msg'],

    trainerCat: null,
    trainerCatSuccess: ['cat_list'],
    trainerCatFailure: ['err_msg'],
    
    trainerSearch: ['search'],
    trainerSearchSuccess: ['list'],
    trainerSearchFailure: ['err_msg'],

    trainerVideos: ['data'],
    trainerVideosSuccess: ['video_list', 'total_page'],
    trainerVideosFailure: ['err_msg'],

    profileDetails: ['trainerId'],
    profileSuccess: ['profile'],
    profileFailure: ['err_msg'],

    checkForNotifications: ['page_no'],
    getNotificationSuccess: ['notifi_List'],
    getNotificationError: ['err_msg'],
    followReqNotification: ['details', 'status'],
    resetNotification: null,
});

export const Constants = Types;
export default Creators;