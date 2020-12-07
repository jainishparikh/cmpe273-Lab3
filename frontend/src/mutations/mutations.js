import { gql } from 'apollo-boost';

const userLogin = gql`
mutation userLogin($email: String, $password: String){
    userLogin(email:$email, password:$password){
        _id,
        name,
        email
    }
  }
`;
const userSignUpMutation = gql`
    mutation userSignUp($name: String, $email: String, $password: String){
        userSignUp(name: $name, email: $email, password: $password){
            email
        }
    }
`;

const updateUserProfileMutation = gql`
    mutation updateUserProfile(
        $name:String,   
        $email:String,
        $nickName:String,
        $contactNumber:String,
        $dateOfBirth:String,
        $city:String,
        $state:String,
        $country:String,
        $headline:String,
        $thingsILove:String,
        $yelpingSince:String
        $blogLink:String
    ){
        updateUserProfile(  name:$name,   
                            email:$email,
                            nickName:$nickName,
                            contactNumber:$contactNumber,
                            dateOfBirth:$dateOfBirth,
                            city:$city,
                            state:$state,
                            country:$country,
                            headline:$headline,
                            yelpingSince:$yelpingSince,
                            thingsILove:$thingsILove,
                            blogLink:$blogLink
                        ){
            email
        }
    }
`;



const placeOrderMutation = gql`
mutation placeOrder(
    $userID:String,
    $restaurantID:String,
    $orderStatus:String,
    $orderMethod:String,
    $dishes:[String]
    )
{
    placeOrder(
        userID:$userID,
        restaurantID:$restaurantID,
        orderStatus:$orderStatus,
        orderMethod:$orderMethod,
        dishes:$dishes,
    )  
{
        _id
        
}
}
`;

const restaurantLogin = gql`
mutation restaurantLogin($email: String, $password: String){
    restaurantLogin(email:$email, password:$password){
        _id,
        name,
        email
    }
  }
`;
const restaurantSignUpMutation = gql`
    mutation restaurantSignUp($name: String, $email: String, $password: String, $location: String){
        restaurantSignUp(name: $name, email: $email, password: $password, location:$location){
            email
        }
    }
`;

export { userLogin, userSignUpMutation, restaurantLogin, restaurantSignUpMutation, updateUserProfileMutation, placeOrderMutation };