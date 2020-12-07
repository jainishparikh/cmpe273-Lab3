import { gql } from 'apollo-boost';


const getUserProfile = gql`
query getUserProfile($email: String){
    getUserProfile(email:$email){
        _id,
        name,
     email,
     nickName,
     contactNumber,
     dateOfBirth,
     city,
     state,
     country,
     headline,
     yelpingSince,
     thingsILove,
     blogLink,
    }
  }
`;

const getUserProfileByID = gql`
query getUserProfileByID($userID: String){
    getUserProfileByID(userID:$userID){
        _id,
        name,
     email,
     nickName,
     contactNumber,
     dateOfBirth,
     city,
     state,
     country,
     headline,
     yelpingSince,
     thingsILove,
     blogLink,
    }
  }
`;

const getRestaurantProfile = gql`
query getRestaurantProfile($email: String){
    getRestaurantProfile(email:$email){
              _id,
             name,
             email,
             location,
             contact,
             description,
             timing,
             restaurantType,
             dishes{
               dishID,
               dishName,
               dishPrice,
               dishCategory,
               dishIngrediants,
               dishDescription
             }
    }
  }
`;

const getRestaurantProfileByID = gql`
query getRestaurantProfileByID($restaurantID: String){
    getRestaurantProfileByID(restaurantID:$restaurantID){
              _id,
             name,
             email,
             location,
             contact,
             description,
             timing,
             restaurantType,
             
    }
  }
`;

const getAllRestaurants = gql`
query getAllRestaurants{
    getAllRestaurants{
        _id,
            name,
             email,
             location,
             contact,
             description,
             contact,
             timing,
             restaurantType,
             dishes{
               dishID,
               dishName,
               dishPrice,
               dishCategory,
               dishIngrediants,
               dishDescription
             }
    }
  }
`;

const getOrdersByUserID = gql`
query getOrdersByUserID($userID: String){
    getOrdersByUserID(userID:$userID){
            _id,
             userID,
             restaurantID
             cancelled
             orderDate,
             orderStatus,
             orderMethod,
             dishes{
                dishID,
                   dishName,
                   dishPrice,
                   dishCategory,
                   dishIngrediants,
                   dishDescription
             }
         
    }
  }
`;

const getOrdersByRestaurantID = gql`
query getOrdersByRestaurantID($restaurantID: String){
    getOrdersByRestaurantID(restaurantID:$restaurantID){
            _id,
             userID,
             restaurantID
             cancelled
             orderDate,
             orderStatus,
             orderMethod,
             dishes{
                dishID,
                   dishName,
                   dishPrice,
                   dishCategory,
                   dishIngrediants,
                   dishDescription
             }
         
    }
  }
`;

const getReviewByUserID = gql`
query getReviewByUserID($userID: String){
    getReviewByUserID(userID:$userID){
             userID
           restaurantID,
           headline,
           reviewText,
           date,
           ratings,
           reviewerName,
          restaurantName,
         
    }
  }
`;

const getReviewByRestaurantID = gql`
query getReviewByRestaurantID($restaurantID: String){
    getReviewByRestaurantID(restaurantID:$restaurantID){
             userID
           restaurantID,
           headline,
           reviewText,
           date,
           ratings,
           reviewerName,
           restaurantName,
         
    }
  }
`;


export { getReviewByUserID, getReviewByRestaurantID, getUserProfileByID, getOrdersByRestaurantID, getUserProfile, getAllRestaurants, getRestaurantProfile, getOrdersByUserID, getRestaurantProfileByID };