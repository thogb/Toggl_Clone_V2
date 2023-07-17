using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;
using TogglTrackCloneApi.Exceptions;

namespace TogglTrackCloneApi.Filters
{
    public class ApiExceptionFilter : ExceptionFilterAttribute
    {
        public override void OnException(ExceptionContext context)
        {
            string message = "Server Error";
            if (context.Exception is APIException)
            {
                APIException ex = (APIException)context.Exception;
                message = ex.Message;
                context.HttpContext.Response.StatusCode = ex.StatusCode;
            } else if (context.Exception is UnauthorizedAccessException)
            {
                message = "Unauthorized Access";
                context.HttpContext.Response.StatusCode = StatusCodes.Status401Unauthorized;
            }

            context.Result = new JsonResult(new ApiError { Message=message});

            base.OnException(context);
        }
    }
}
