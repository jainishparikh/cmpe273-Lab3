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


export { getUserProfile, getAllRestaurants, getRestaurantProfile, getOrdersByUserID, getRestaurantProfileByID };