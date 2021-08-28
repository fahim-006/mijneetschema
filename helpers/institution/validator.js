var validator = require('validator');
var in_array = require('in_array');
var nodeMailer = require('nodemailer');
 
var self = module.exports = 
{
  loginValidator: function(data) 
  {
     let $errors = {};
     
     let keys = Object.keys(data);

     let requiredKeys = ['email','password'];

     for($j=0;$j<requiredKeys.length;$j++)
     {
       $requiredKey = requiredKeys[$j];

       if(!in_array($requiredKey,keys))
       {
         $errors[$requiredKey] = $requiredKey+' is required';
       }
     }
     
     if(keys.length > 0)
     {
      for($i = 0;$i<keys.length;$i++) 
      {
        $key = keys[$i];
        $value = data[$key];
            
            switch($key)
            {
                case 'email':
                
                if(!validator.isEmail($value))
                {
                    $errors[$key] = 'Enter a valid email';
                }
                break;
                case 'password':
                
                if(validator.isEmpty($value))
                {
                    $errors[$key] = $key+' is required';
                }
                break;

                default:

                break;
            }

        }
        return (Object.keys($errors).length > 0)?$errors:false;
     }

  },

  channelValidator(data)
  {
     let $errors = {};
     
     let keys = Object.keys(data);

     let requiredKeys = ['name','link','category_id','status','playing_interval'];

     for($j=0;$j<requiredKeys.length;$j++)
     {
       $requiredKey = requiredKeys[$j];

       if(!in_array($requiredKey,keys))
       {
         $errors[$requiredKey] = $requiredKey+' is required';
       }
     }
     
     if(keys.length > 0)
     {
      for($i = 0;$i<keys.length;$i++) 
      {
        $key = keys[$i];

        $value = data[$key];
            
            switch($key)
            {
                case 'name':
                
                if(validator.isEmpty($value))
                {
                    $errors[$key] = 'Name is required';
                }
                break;

                case 'category_id':
                
                if(validator.isEmpty($value))
                {
                    $errors[$key] = 'Category is required';
                }
                break;

                case 'link':
                
                if(!validator.isURL($value))
                {
                    $errors[$key] = 'Enter a valid link';
                }
                break;

                case 'status':
                
                if(!validator.isNumeric($value))
                {
                    $errors[$key] = 'Please enter a valid publish data';
                }
                break;
                
                default:

                break;
            }

        }
        return (Object.keys($errors).length > 0)?$errors:false;
     }

  },

  bannerValidator(data)
  {
     let $errors = {};
     
     let keys = Object.keys(data);

     console.log("=========>>>>>>>>>keys in validator ==========",keys);

     let requiredKeys = ['name','link'];

     for($j=0;$j<requiredKeys.length;$j++)
     {
       $requiredKey = requiredKeys[$j];

       if(!in_array($requiredKey,keys))
       {
         $errors[$requiredKey] = $requiredKey+' is required';
       }
     }
     
     if(keys.length > 0)
     {
      for($i = 0;$i<keys.length;$i++) 
      {
        $key = keys[$i];

        $value = data[$key];
            
            switch($key)
            {
                case 'name':
                
                if(validator.isEmpty($value))
                {
                    $errors[$key] = 'Name is required';
                }
                break;

                case 'link':
                
                if(!validator.isURL($value))
                {
                    $errors[$key] = 'Enter a valid link';
                }
                break;
                
                default:

                break;
            }

        }
        return (Object.keys($errors).length > 0)?$errors:false;
     }

  },

  adValidator(data)
  {
    let $errors = {};
     
     let keys = Object.keys(data);

     let requiredKeys = ['name','link','status','count'];

     for($j=0;$j<requiredKeys.length;$j++)
     {
       $requiredKey = requiredKeys[$j];

       if(!in_array($requiredKey,keys))
       {
         $errors[$requiredKey] = $requiredKey+' is required';
       }
     }
     
     if(keys.length > 0)
     {
      for($i = 0;$i<keys.length;$i++) 
      {
        $key = keys[$i];
        $value = data[$key];
            
            switch($key)
            {
                case 'link':
                
                if(!validator.isURL($value))
                {
                    $errors[$key] = 'Enter a valid link';
                }
                break;
                case 'status':
                
                if(!validator.isNumeric($value))
                {
                    $errors[$key] = 'Please enter a valid publish data';
                }
                break;
                case 'count':
                
                if(!validator.isNumeric($value))
                {
                    $errors[$key] = 'Please enter a valid data';
                }
                break;

                default:

                if(validator.isEmpty($value))
                {
                    $errors[$key] = 'Please enter a valid '+$key;
                }

                break;
            }

        }
        return (Object.keys($errors).length > 0)?$errors:false;
     }

  },
  profileValidator(data)
  {
    let $errors = {};
     
     let keys = Object.keys(data);

     let requiredKeys = ['username','profile_img','mobile_number','email'];

     for($j=0;$j<requiredKeys.length;$j++)
     {
       $requiredKey = requiredKeys[$j];

       if(!in_array($requiredKey,keys))
       {
         $errors[$requiredKey] = $requiredKey+' is required';
       }
     }
     
     if(keys.length > 0)
     {
      for($i = 0;$i<keys.length;$i++) 
      {
        $key = keys[$i];
        $value = data[$key];
        

            switch($key)
            {
                case 'email':
                
                if(!validator.isEmail($value))
                {
                    $errors[$key] = 'Enter a valid Email Address';
                }
                break;

                case 'mobile_number':
                
                if(!validator.isMobilePhone($value))
                {
                    $errors[$key] = 'Please enter a valid Mobile Number';
                }
                break;

                case 'username':
                
                if(validator.isEmpty($value))
                {
                    $errors[$key] = 'Username is required';
                }
                break;

                case 'profile_img':
                
                if(validator.isEmpty($value))
                {
                    $errors[$key] = 'Profile Image is required';
                }
                break;

                default:

                break;
            }

        }
        return (Object.keys($errors).length > 0)?$errors:false;
     }

  }

};


