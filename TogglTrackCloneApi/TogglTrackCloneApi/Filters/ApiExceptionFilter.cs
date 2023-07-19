using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;
using TogglTrackCloneApi.Exceptions;

namespace TogglTrackCloneApi.Filters
{
    public class ApiExceptionFilter : ExceptionFilterAttribute
    {
        private readonly ILogger<ApiExceptionFilter> _logger;

        public ApiExceptionFilter(ILogger<ApiExceptionFilter> logger)
        {
            this._logger = logger;
        }
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
            _logger.LogError(context.Exception.ToString());

            base.OnException(context);
        }
    }
}
