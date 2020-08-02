using log4net;
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
        private static readonly ILog Log =
              LogManager.GetLogger(System.Reflection.MethodBase.GetCurrentMethod().DeclaringType);
        public string HostUrl { get; set; }
        public UserHelper()
        {
            HostUrl = ApplicationConfigurations.ECareAPIUrl;
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
                Log.Info("Inside LoginUserAsync");
                // Initialization.  
                LoginModelResponse responseObj =null;
                // Posting.  
                using (var client = new HttpClient())
                {
                    Log.Info("Host Url: "+ HostUrl);
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
                        new KeyValuePair<string, string>("schoolcode",user.schoolcode),
                    };

                    // Convert Request Params to Key Value Pair.  
                    // URL Request parameters.  
                    HttpContent requestParams = new FormUrlEncodedContent(allIputParams);
                    //Log.Info("requestParams: "+ requestParams.ReadAsStringAsync().Result);
                    // HTTP POST  
                    response = await client.PostAsync("oauth/token", requestParams).ConfigureAwait(false);

                    Log.Info("IsSuccessStatusCode: " + response.StatusCode +" : "+ response.IsSuccessStatusCode);
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
                Log.Error("LoginUserAsync: " + ex.ToString());
                throw ex;
            }
        }


    }
}