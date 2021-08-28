const timestamp = require("time-stamp");
const Notification = require("../../../../models/notification");
created_date = timestamp.utc('YYYY-MM-DD HH:mm:ss');

module.exports.createNotification =async (sender,receiver,content,type) => {
    try {
        const Notification_data= new Notification({
            sender:sender,
            receiver:receiver,
            content:content,
            isRead:false,
            type:type,
            created_at:created_date
        })
        let notiDetails = await Notification_data.save();

        return {
            status:200,
            message:"Data saved",
            data:notiDetails
        }
    } catch (error) {
        console.log("error====>",error.message)
        return {
            status:400,
            message:error.message,
            data:{}
        }
    }
}

module.exports.fetchNotification = async (receiverId,pageno) => {
    try {
        let notiDetails,notiCount;
        let limit=5;
        let skip = (pageno-1)*limit 
        let query={
            receiver : receiverId,
            status:1
        }
        console.log("query==============>",query)

        notiDetails = await Notification.find(query).populate('sender').sort({created_at:-1}).skip(skip).limit(limit);
        notiCount = await Notification.find(query).count();
        
        return {
            status:200,
            message:"Data fetched",
            data:{
                notificationList:notiDetails,
                totalpages:Math.ceil(notiCount/limit),
                notificationCount : notiCount
            }
        }

    } catch (error) {
        console.log("error====>",error.message)
        return {
            status:400,
            message:error.message,
            data:{}
        }
    }
}

module.exports.markRead = async (notificationId,userId) => {
    try {
        let query={
            _id:notificationId,
            receiver:userId
        }
        let newData={
            isRead:true
        }
        notiDetails = await Notification.findOneAndUpdate(query,newData,{returnNewDocument:true});
        
        return {
            status:200,
            message:"Data udpated",
            data:{
                notificationDetail:notiDetails
            }
        }

    } catch (error) {
        console.log("error====>",error.message)
        return {
            status:400,
            message:error.message,
            data:{}
        }
    }
}

module.exports.updateStatus = async (notificationId,status) => {
    try {
        let query={
            _id:notificationId
        }
        let newData={
            status:status
        }
        notiDetails = await Notification.findOneAndUpdate(query,newData,{returnNewDocument:true});
        
        return {
            status:200,
            message:"Data udpated",
            data:{
                notificationDetail:notiDetails
            }
        }

    } catch (error) {
        console.log("error====>",error.message)
        return {
            status:400,
            message:error.message,
            data:{}
        }
    }
}