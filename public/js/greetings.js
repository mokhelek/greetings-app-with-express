export default function greetUsers() {
  
    let greetedUserName = "";
    let greetLanguage = "";


    function setUserName(userName) {
        greetedUserName = userName.toLowerCase();
    }

    function getUserName() {
        return greetedUserName;
    }

 
    function setLanguage(language) {
        greetLanguage = language;
    }

    function getLanguage() {
        return greetLanguage;
    }

    function getLanguagesGreet() {
        if (getLanguage() == "english") {
            return "Hello";
        }
        if (getLanguage() == "xhosa") {
            return "Molo";
        }
        if (getLanguage() == "sesotho") {
            return "Dumela";
        }
    }
 

    function getUserGreeting() {

        return getLanguagesGreet() + ", " + greetedUserName;
    }

    function checkValidName(userName) {
        const regex = /^[A-Za-z\s]+$/;
        return regex.test(userName);
    }


    async function homePage(db){
        let userGreeting = false;
        let userCount = 0;

        
        if( getUserGreeting().includes("Molo" ) || getUserGreeting().includes("Hello") || getUserGreeting().includes("Dumela")){
            userGreeting = getUserGreeting();
        }
    
        let greetedUsersData = await db.any("SELECT * FROM greetings");
    
        for (let i = 0; i < greetedUsersData.length; i++) {
            userCount += Number(greetedUsersData[i].counter);
        }

        return {
            userGreeting,
            userCount
        }

    }

    async function addUser(db){
   
        

        return {
           
        }

    }





    return {
        getUserName,
        getLanguage,
        getUserGreeting,
        getLanguagesGreet,
        setLanguage,
        setUserName,
        checkValidName,

        homePage,
        addUser,
        
      
    };
}
