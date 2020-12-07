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

const updateRestaurantProfile = gql`
    mutation updateRestaurantProfile(
        $name:String,   
        $email:String,
        $location:String,
        $contact:String,
        $description:String,
        $timing:String,
    ){
        updateRestaurantProfile(  name:$name,   
                            email:$email,
                            location:$location,
                            contact:$contact,
                            description:$description,
                            timing:$timing,
                           
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

const addDishMutation = gql`
    mutation addDish(
        $restaurantID: String, $dishName: String, $dishIngrediants: String, $dishPrice: String, $dishDescription: String, $dishCategory: String){
        addDish(restaurantID:$restaurantID, dishName:$dishName, dishIngrediants:$dishIngrediants, dishPrice:$dishPrice, dishDescription:$dishDescription, dishCategory:$dishCategory){
            dishes{
                       dishName
                    }
        }
    }
`;

const editDishMutation = gql`
    mutation editDish(
        $restaurantID: String, $dishID:String,$dishName: String, $dishIngrediants: String, $dishPrice: String, $dishDescription: String, $dishCategory: String){
            editDish(restaurantID:$restaurantID, dishID:$dishID,dishName:$dishName, dishIngrediants:$dishIngrediants, dishPrice:$dishPrice, dishDescription:$dishDescription, dishCategory:$dishCategory){
                dishes{
                    dishName
                 }
        }
    }
`;

const updateOrderStatusMutation = gql`
    mutation updateOrderStatus(
        $orderID: String, $orderStatus:String){
            updateOrderStatus(orderID:$orderID, orderStatus:$orderStatus){
                dishes{
                    dishName
                 }
        }
    }
`;

const addReviewMutation = gql`
    mutation addReview(
        $restaurantID: String, $userID: String, $headline: String, $reviewText: String, $ratings: String, $restaurantName: String, $reviewerName: String, $date: String){
            addReview(restaurantID:$restaurantID, userID:$userID, headline:$headline, reviewText:$reviewText, ratings:$ratings, restaurantName:$restaurantName,reviewerName:$reviewerName,date:$date){
           reviewText
        }
    }
`;

export { addReviewMutation, updateOrderStatusMutation, userLogin, addDishMutation, editDishMutation, userSignUpMutation, restaurantLogin, restaurantSignUpMutation, updateUserProfileMutation, placeOrderMutation, updateRestaurantProfile };