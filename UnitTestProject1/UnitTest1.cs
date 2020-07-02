using System;
using System.Text;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using SchoolApi.BAL;
using static HttpResponseExtensions;

namespace UnitTestProject1
{
    [TestClass]
    public class UnitTest1
    {
        [TestMethod]
        public void TestCreateUser()
        {
            try
            {
                UserHelper obj = new UserHelper();
                User _user= new User()
                {
                Email= "RITESH@gmail.com",
                Username= "P1083",
                FirstName="RITESH",
                LastName="KHARKA",
                RoleName= "Student",
                Password= "P1083@abc123",
                ConfirmPassword="P1083@abc123"
                };
                var test = obj.CreateUserAsync(_user).Result;

            }
            catch (AggregateException ex)
            {
                var sb = new StringBuilder();
                sb.AppendLine("One or more exceptions has occurred:");
                foreach (var exception in ex.InnerExceptions)
                {
                    sb.AppendLine("  " + exception.Message);
                }
                string result =  sb.ToString();
            }
        }
    }
}
