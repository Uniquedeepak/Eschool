using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace SchoolApi.Utility
{
    public class CookiesHelper
    {
        public static void SaveData(HttpResponseBase response,List<KeyValuePair<string,string>> Data)
        {
            foreach (var item in Data)
            {
                HttpCookie cookie = new HttpCookie(item.Key,item.Value);
                response.Cookies.Add(cookie);
            }
        }
    }
}