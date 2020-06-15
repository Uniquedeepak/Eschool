using System;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using SchoolApi.BAL;

namespace UnitTestProject1
{
    [TestClass]
    public class TestFee
    {
        [TestMethod]
        public void TestGetFine()
        {
            Fee obj = new Fee();
            var result = obj.GetFine("4356");
            
        }
        [TestMethod]
        public void TestGetMonthlyPendingFee()
        {
            Fee obj = new Fee();
            var result = obj.GetMonthlyPendingFee("2","4");

        }

    }
}
