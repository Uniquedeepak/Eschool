using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace SchoolApi.Models
{
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