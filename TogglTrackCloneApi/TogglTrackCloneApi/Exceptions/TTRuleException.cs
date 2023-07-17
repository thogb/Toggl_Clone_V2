namespace TogglTrackCloneApi.Exceptions
{
    public class TTRuleException : APIException
    {
        public TTRuleException(string message) : base(StatusCodes.Status400BadRequest, message)
        {
            
        }
    }
}
