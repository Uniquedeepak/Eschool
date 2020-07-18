using Newtonsoft.Json;
using SchoolApi.Models;
using System;
using System.Collections.Generic;
using System.Net.Http;
using System.Net.Http.Headers;
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
            var requestUri = $"{HostUrl}api/accounts/create";
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

        public async Task<LoginModelResponse> LoginUserAsync(LoginModel user)
        {
            try
            {
                // Initialization.  
                LoginModelResponse responseObj =null;
                // Posting.  
                using (var client = new HttpClient())
                {
                    // Setting Base address.  
                    client.BaseAddress = new Uri(HostUrl);

                    // Setting content type.  
                    client.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));
                    // Initialization.  
                    HttpResponseMessage response = new HttpResponseMessage();
                    List<KeyValuePair<string, string>> allIputParams = new List<KeyValuePair<string, string>>()
                    {
                        new KeyValuePair<string, string>("username",user.username),
                        new KeyValuePair<string, string>("password",user.password),
                        new KeyValuePair<string, string>("grant_type",user.grant_type),
                    };

                    // Convert Request Params to Key Value Pair.  
                    // URL Request parameters.  
                    HttpContent requestParams = new FormUrlEncodedContent(allIputParams);

                    // HTTP POST  
                    response = await client.PostAsync("oauth/token", requestParams).ConfigureAwait(false);

                    // Verification  
                    if (response.IsSuccessStatusCode)
                    {
                        responseObj = response.ContentAsType<LoginModelResponse>();
                     }
                }
                return responseObj;
            }
            catch (Exception ex)
            {
                return null;
                //throw;
            }
        }


    }
}