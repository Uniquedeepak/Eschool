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
}