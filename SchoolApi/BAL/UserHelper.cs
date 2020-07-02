using Newtonsoft.Json;
using SchoolApi.Models;
using System;
using System.Collections.Generic;
using System.Net.Http;
using System.Threading.Tasks;

namespace SchoolApi.BAL
{
    public class UserHelper
    {
        public string HostUrl { get; set; }
        public UserHelper()
        {
            HostUrl = PropertiesConfiguration.ECareAPIUrl;
        }
        public async Task<string> CreateUserAsync(User user)
        {
            var requestUri = $"{HostUrl}/api/accounts/create";
            HttpResponseMessage response = await HttpRequestFactory.Post(requestUri, user);
            if (!response.IsSuccessStatusCode)
            {
                string responsemsg = response.ContentAsString();
                var test = JsonConvert.DeserializeObject<ErrorModelState>(responsemsg);
                return test.message;
            }
            UserResponse responseText = response.ContentAsType<UserResponse>();
            
            string UserId = $"{responseText.userName}-{responseText.id}";
            return UserId;

        }
    }

    #region User Model
    public class User
    {
        public string Email { get; set; }
        public string Username { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string RoleName { get; set; }
        public string Password { get; set; }
        public string ConfirmPassword { get; set; }

    }
    public class UserResponse
    {
        public string url { get; set; }
        public string id { get; set; }
        public string userName { get; set; }
        public string fullName { get; set; }
        public string email { get; set; }
        public bool emailConfirmed { get; set; }
        public List<object> roles { get; set; }
        public List<object> claims { get; set; }

    }
    #endregion
}