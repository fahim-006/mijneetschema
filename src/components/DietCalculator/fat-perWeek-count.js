var moment = require('moment');
const BodyFatPerWeek = (data, last_daily_calories, basalMetabolic, maintenanceDailyIntake) => {
    /*
        In this formula we'll calculate the values for the following terms and follow the steps 
        as given below:

        1)  starting_weight & starting_body_fat => Get by user input in calculator steps
        2)  (LBM) lbm => lbm = { starting_weight - starting_weight * (starting_body_fat / 100) };
        3)  Target_Before_Protocol => { lbm*100/(100-starting_body_fat) };
        4)  contest_date => { new Date(day,month,year) };
        5)  Difference_In_Time => { contest_date.getTime() - today.getTime(); };
        6)  Days_Till_Contest => { Difference_In_Time / (1000 * 3600 * 24); };
        7)  Weeks_Till_Contest =>  { days_till_contest / 7 };
        8)  max_weight_loss_per_week => It's value will be based on starting_body_fat. As given below :
            ( starting_body_fat > 14 ? 1.20 : 1)

        9)  max_fat_loss_in_time => Calculate by this eq. : 
            { max_fat_loss_in_time= weeks_till_contest-2*max_weight_loss_per_week; }

        10) Now calculate  Lowest_Possible_Target => lowest_possible_target, 
            will be consider according to Starting bodyfat and some calculations
            
        11) target_bodyfat => Will get it from user input, "currently not in flow", 
            So, take a constant value for now, will consider it as 7%

        12) target_weight_loss_before_peaking_control = (lbm * 100) / (100 - target_bodyfat);
        13) Claculate weeks_out1 => week_out1 is related to previous_week and remaing_weeks_out
        14) Body fat by week "body_fat_by_week" =>  calculate "body fat by week" based on some if else
        15) Diet Plan Type => This is also a calculation based on some if else conditions
        16) Calculate target_weight_lose / target_weight_gain according to if else conditions
        17) Calculate  "Net weight Loss" according to if else conditions for weeks
        18) Calculate "weekly weight loss" according some if else conditions
        19) Calculate daily_calories
        20) Calculate protein, carbs, fats;
    */
    var finalResult = []; // will show a table for per weeks (For now on congratulation screen) 
    var starting_weight   =   parseInt(data.personal_mesurement.current_weight); 
    var starting_body_fat =   parseInt(data.personal_mesurement.fat_percent);
    var start_date        =   moment().format('DD-MM-YYYY');
    var lbm               =   starting_weight - starting_weight * (starting_body_fat / 100);
    var target_before_protocol  =   (lbm*100/(100-starting_body_fat));
    var today                   =   moment().format('DD-MM-YYYY');
    var contest_date            =   moment().add(90, 'days').format('DD-MM-YYYY');  // It will be the starting day, after complition of the calculations we will change this.
    var Difference_In_Time      =   moment(`${contest_date}`, 'DD-MM-YYYY').diff(moment(`${start_date}`, 'DD-MM-YYYY'), 'days');
    var Days_Till_Contest       =   Difference_In_Time;
    var weeks_till_contest      =   parseFloat((Days_Till_Contest / 7).toFixed(1));
    
        
    // //////////////////////////////////////////////////////////////////////////////////////////////////
    // These are the initial values before start weekly calculations.
    var max_weight_loss_per_week = starting_body_fat > 14 ? 1.20 : 1;
    var max_fat_loss_in_time = weeks_till_contest-2*max_weight_loss_per_week; // max achievable weight
    var target_bodyfat = 7;
    var lowest_possible_target;
    var target_weight_loss_before_peaking_control;

        // target_before_protocol has calculated in line 41
        if ( 1 - target_before_protocol / (starting_weight - max_fat_loss_in_time) < 0.045 ) {
            lowest_possible_target = 0.045;
        } else {
            lowest_possible_target = 1 - target_before_protocol / (starting_weight - max_fat_loss_in_time + 0.1);
        }
        
        target_weight_loss_before_peaking_control = ((lbm * 100) / (100 - target_bodyfat)).toFixed(2);

    // //////////////////////////////////////////////////////////////////////////////////////////////////

    // calculations for first week (Initial week)
    // Declaration of variables start
    // Week counters
    var weeks_out1 = weeks_till_contest; 
    var current_weeks_out = weeks_out1;
    var previous_week = weeks_out1;
    var remaing_weeks_out = weeks_out1;
    
    // body fats
    var previous_body_fat = starting_body_fat; // on starting next week :=> "body_fat_by_week" will become "previous_body_fat"
    var body_fat_by_week;
    
    // Diet Plan Type
    var diet_plan_type;
    var current_diet_plan_type;
    var previous_diet_plan_type;
    var current_week_body_fat = starting_body_fat;  //  as per my assumption we can try "body_fat_by_week" at place of current_week_body_fat
    
    // Weight
    // Initially value of previous_weight, current_week_weight and last_week_weight will value of starting_weight
    var weight, new_week_weight;
    var previous_weight = starting_weight;    
    var current_week_weight = starting_weight;
    var last_week_weight = starting_weight; 
    
    // NET Weight Loss
    var net_weight_loss = 0;
    var weekly_weight_loss = 0;
    var current_weekly_weight_loss;
    
    // daily calories  maintenanceDailyIntake
    // var daily_calories = basalMetabolic - (7000 * weekly_weight_loss) / 7;
    var daily_calories = maintenanceDailyIntake - (7000 * weekly_weight_loss) / 7;
    let weekData
    // Declaration of variables end

    // //////////////////////////////////////////////////////////////////////////////////////////////////
    // First Week Calculation
    let firstweekData = {
        previous_weight: starting_weight,
        current_week_weight: starting_weight,
        previous_body_fat: starting_body_fat,
        current_week_body_fat: starting_body_fat,
        remaining_weeks: weeks_till_contest,
        weekly_weight_loss,
        net_weight_loss,
        daily_calories,
    }

    finalResult.push(firstweekData);
    weeks_out1 -= 1;    

// First week calculation end
//  ***********************************************************************************
// Second week calculation start

    // ** in second week previous_body_fat will remain same as in first week **
    // body_fat_by_week = ( previous_body_fat - (previous_body_fat - target_bodyfat) / (weeks_out1 - 1)).toFixed(2);
     
    if (starting_body_fat > 10){
        body_fat_by_week = 100*(1-lbm/(starting_weight-1))
    }else{
        body_fat_by_week = ( previous_body_fat - (previous_body_fat - target_bodyfat) / (weeks_out1 - 1)).toFixed(2);
    }

    console.log('body_fat_by_week', body_fat_by_week);

    current_week_body_fat = parseFloat(body_fat_by_week);
    console.log('current_week_body_fat', current_week_body_fat);

    // Diet Plan Type
    if (current_weeks_out == 0) {
        diet_plan_type = 0;
    } else if (current_week_body_fat > 12) {
        diet_plan_type = "Standard";
    } else if (current_week_body_fat > 8.5) {
        diet_plan_type = "Low carb macros";
    } else if (current_week_body_fat > target_bodyfat) {
        diet_plan_type = "Carb cycling";
    } else {
        diet_plan_type = "Goal Achieved / Peak week protocol";
    }
    current_diet_plan_type = diet_plan_type;
    previous_diet_plan_type = diet_plan_type;

    // weight calculation after one week,
    let new_weight = 0;
    if (body_fat_by_week == 0) {
        new_weight = 0; // weight = 0;
    } else if (diet_plan_type == "Goal Achieved / Peak week protocol") {
        if (current_weeks_out < 1) {
            new_weight = (target_weight_loss_before_peaking_control - 1.2); // weight = target_weight_loss_before_peaking_control - 1.2;
            // console.log('weight else if if', weight);
        } else {
            new_weight = target_weight_loss_before_peaking_control; // weight = target_weight_loss_before_peaking_control;
            // console.log('weight else if else', weight);
        }
    } else {
        new_weight = ((lbm * 100) / (100 - body_fat_by_week)); // weight = (lbm * 100) / (100 - body_fat_by_week);
    }
    
    current_week_weight = parseFloat(new_weight);
    // ** in second week previous_weight will remain same as in first week **
    // console.log("previous_weight ", previous_weight, 'current_week_weight ', current_week_weight);
    let weight_Ls = (previous_weight - parseFloat(new_weight));
    console.log('new_weight', new_weight);
    console.log('weight_Ls', weight_Ls);
    weekly_weight_loss = parseFloat(weight_Ls);
    console.log('weekly_weight_loss', weekly_weight_loss);
    net_weight_loss = net_weight_loss + weekly_weight_loss;

    daily_calories = maintenanceDailyIntake - (7000 * weekly_weight_loss) / 7;
    console.log('daily_calories', maintenanceDailyIntake - (7000 * 0.5) / 7);
    console.log('daily_calories', maintenanceDailyIntake - (7000 * 1) / 7);

    let second_WeekData = {
        previous_weight: previous_weight,
        current_week_weight: current_week_weight,
        previous_body_fat: previous_body_fat,
        current_week_body_fat: current_week_body_fat,
        remaining_weeks: weeks_out1,
        weekly_weight_loss: weekly_weight_loss,
        net_weight_loss: net_weight_loss,
        daily_calories
    }

    finalResult.push(second_WeekData);
    weeks_out1 -= 1;

    // Second Week finish
    // ***********************************************************************************
    
    // //////////////////////////////////////////////////////////////////////////////////////////////////
    // Calculation for third Week to last week Start

    
    while(weeks_out1 > 0){
        
        // assuming current_weeks_out are equals to remaing_weeks_out
        // assign value to "current_weeks_out"
        current_weeks_out = weeks_out1;
        // console.log("current_weeks_out", current_weeks_out);

        previous_body_fat = current_week_body_fat;
        // body_fat_by_week
        console.log('previous_body_fat ' + previous_body_fat)
        if (weeks_out1 == 0) {
            
            console.log('body_fat_by_week weeks_out1 == 0' + body_fat_by_week)
            body_fat_by_week = 0;

        } else if ( (remaing_weeks_out - ((current_week_body_fat - target_bodyfat) / (weeks_till_contest - 2))) < target_bodyfat ) {

            body_fat_by_week = starting_body_fat;
            console.log('body_fat_by_week weeks_out1 == 0 else if' + previous_body_fat, 'body_fat_by_week', body_fat_by_week)

        } else if (previous_body_fat > 14) {

            body_fat_by_week = 100 * (1 - lbm / (previous_weight - max_weight_loss_per_week));

            console.log('body_fat_by_week previous_body_fat > 14' + previous_body_fat, 'body_fat_by_week', body_fat_by_week)
            
        } else if (previous_body_fat > 10) {

            body_fat_by_week = 100 * (1 - lbm / (previous_weight - max_weight_loss_per_week));

            console.log('body_fat_by_week previous_body_fat > 10' + previous_body_fat, 'body_fat_by_week', body_fat_by_week)

        } else {
            // as per my assumption this calculation is for first week.
            body_fat_by_week = previous_body_fat - (previous_body_fat - target_bodyfat) / (weeks_out1 - 1);
            console.log('body_fat_by_week last else part' + previous_body_fat, 'body_fat_by_week', body_fat_by_week )
        }

        // assign body_fat_by_week to current_week_body_fat, i.e. current_week_body_fat = body_fat_by_week;
        current_week_body_fat = parseFloat(body_fat_by_week);  

    // **********************************************************
        
        // Diet Plan Type
        if (current_weeks_out == 0) {
            diet_plan_type = 0;
        } else if (current_week_body_fat > 12) {
            diet_plan_type = "Standard";
        } else if (current_week_body_fat > 8.5) {
            diet_plan_type = "Low carb macros";
        } else if (current_week_body_fat > target_bodyfat) {
            diet_plan_type = "Carb cycling";
        } else {
            diet_plan_type = "Goal Achieved / Peak week protocol";
        }

        current_diet_plan_type = diet_plan_type
    // **********************************************************

        //  target_weight_loss_before_peaking_control
        /**
         * Some importent guidelines for weight calculation. The weekly weight loss: 
         * So we always start with the start weight. 
         * But in the second week we will calculate the expected weight with the same formula given below: 
         * var weight;
        **/
        previous_weight = current_week_weight;

        console.log('previous_weight', previous_weight);

        if (body_fat_by_week == 0) {
            console.log('if bodyfat is zero');
            new_weight = 0; // weight = 0;
        } else if (diet_plan_type == "Goal Achieved / Peak week protocol") {
            if (current_weeks_out < 1) {
                console.log('if current_weeks_out < 1');
                new_weight = (target_weight_loss_before_peaking_control - 1.2); // weight = target_weight_loss_before_peaking_control - 1.2;
            } else {
                console.log('else current_weeks_out ');
                new_weight = target_weight_loss_before_peaking_control; // weight = target_weight_loss_before_peaking_control;
            }
        } else {
            console.log('else  ');
            new_weight = ((lbm * 100) / (100 - body_fat_by_week)); // weight = (lbm * 100) / (100 - body_fat_by_week);
        }

        console.log('new_weight ', new_weight);
        current_week_weight = parseFloat(new_weight);
        weight_Ls = (previous_weight - new_weight);
        weekly_weight_loss = parseFloat(weight_Ls);
        net_weight_loss = net_weight_loss + weekly_weight_loss;

        // Calculate daily_calories
        // if ( weekly_weight_loss == 0 ) {
            if(
                current_diet_plan_type == "Goal Achieved / Peak week protocol" ||
                previous_diet_plan_type == "Goal Achieved / Peak week protocol"
            ) {
                    // I dont now if i have coded this operation correctly but
                    // the answer of this operation will be the result if it does
                    // not generate any error otherwise the outcome is "set activity level in Goals"
                    // So I wrote it as is
                    //** Query:From where the BMR value is coming? - the BMR is var basalMetabolic from the previous code of the diet calculator flow
                daily_calories = last_daily_calories;  // take the last_daily_calories value from Macardle method line no. 129
                // console.log('weekly_weight_loss if daily_calories' + daily_calories);
                    // BMRphysicalActivity = basalMetabolic
                    /**
                    * Actual equation is given below (provided by client)
                    * daily_calories = "BMRphysicalActivity" - (7000 * weekly_weight_loss) / 7;
                    **/
            } else {
                try {
                    // BMRphysicalActivity = basalMetabolic
                    // Replace basalMetabolic with maintenanceDailyIntake for every case
                    // daily_calories = basalMetabolic - (7000 * weekly_weight_loss) / 7;
                    daily_calories = maintenanceDailyIntake - (7000 * weekly_weight_loss) / 7;
                    // console.log('weekly_weight_loss else try daily_calories' + daily_calories);

                } catch (error) {
                    daily_calories = "set activity level in Goals";
                    // console.log('weekly_weight_loss else catch daily_calories' + daily_calories);
                }
            }
        // }

        previous_diet_plan_type = current_diet_plan_type;

        let weekData= {
            previous_weight: previous_weight,
            current_week_weight: current_week_weight,
            previous_body_fat: (previous_body_fat).toFixed(2),
            current_week_body_fat: (current_week_body_fat).toFixed(2),
            remaining_weeks: parseFloat((weeks_out1).toFixed(2)),
            weekly_weight_loss: weekly_weight_loss,
            net_weight_loss: net_weight_loss,
            daily_calories
        }
        console.log('weekData ', weekData);
        finalResult.push(weekData);
        weeks_out1 -= 1;
        
    }

    console.log('finalResult arr', finalResult);
    // End of Calculation for third Week to last week
    // //////////////////////////////////////////////////////////////////////////////////////////////////

    var protein, carbs, fats;
    //** hallbaargewicht means achievable weight;
    //Var haalbaargewicht = weight after 90 days;
    if (data.body_type === 'ECTOMORPH'){ 
        //** - the bodytype also need to be in the diet plan calculator. 
       //** - Previously i saw that you had integrated that option with the pictures but do not see it now
       protein = "30%";// - these percentages needs to be calculated from the outcome of the complete
       // - if else from other calculation used see:
       // - "if(goal=="afvallen" & bodyFat >10){  "
       // - the above line written in our code 
       // - "if (target === "weightLoss" & fat_percent > 10) {"
       // so the outcome will be based on the condition of the if then else.
       // probably store the outcome from the if else (so not this percentage)
       // in a variable and call it last_daily_calories" because we need this in
       // the calculation for daily calories
       carbs = "50%";    // also a percentage of last daily calories these outcomes will be total
       // kcalories per categorie. but in case of protein and cards we also like
       // to have the grams so divide this outcome from protein and carbs by 4
       // and store them in another variable.
       fats = "20%";     // also a percentage of last daily calories in this case "fats" divide by 9
       // and store in other variable
    }
    if (data.body_type === 'MESOMORPH'){
        protein = "40%";     // also a percentage of last daily calories
        carbs = "40%";       // also a percentage of last daily calories
        fats = "20%";        // also a percentage of last daily calories
    }
    if (data.body_type === 'ENDOMORPH'){
        protein = "50%";     // also a percentage of last daily calories
        carbs = "30%";       // also a percentage of last daily calories
        fats = "20%";        // also a percentage of last daily calories
    }

    let diet = {
        protein: protein,
        carbs: carbs,
        fats: fats,
    }

    // Fianl result;
    finalResult.push(diet);
    return finalResult;
    // Calculation ends here
}

export default BodyFatPerWeek;