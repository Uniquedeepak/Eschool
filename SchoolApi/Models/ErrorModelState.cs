using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace SchoolApi.Models
{
    public class ModelState
    {
        public List<string> x { get; set; }
    }

    public class ErrorModelState
    {
        public string message { get; set; }
        public SchoolApi.Models.ModelState modelState { get; set; }

    }
}

