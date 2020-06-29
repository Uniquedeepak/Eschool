using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace SchoolApi.Models
{
    public static class MessageTemplate
    {
        public static string PendingFeeTemplate { get; set; }

        static MessageTemplate()
        {
            Init();
        }
        public static void Init()
        {
            PendingFeeTemplate = "Dear Parents, Your Ward {0} in {1} has pending fee due of Rs.{2}. Please clear the Pending Fee.";
        }
    }

    public enum MessageType
    {
        PendingFee,
        SMStoAdmin,

    }
}