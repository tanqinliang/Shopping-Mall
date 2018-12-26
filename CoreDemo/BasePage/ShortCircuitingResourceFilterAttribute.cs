using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;
using System;
using System.Collections.Generic;
using System.Text;

namespace VSOFO.BasePage
{
    public class ShortCircuitingResourceFilterAttribute : IResourceFilter
    {
        public void OnResourceExecuted(ResourceExecutedContext context)
        {
          
        }

        public void OnResourceExecuting(ResourceExecutingContext context)
        {
            context.Result = new ContentResult()
            {
                Content = "Resource unavailable - header should not be set"
            };
        }
    }
}
