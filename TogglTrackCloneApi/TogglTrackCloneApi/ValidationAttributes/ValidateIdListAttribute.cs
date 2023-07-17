using System.ComponentModel.DataAnnotations;

namespace TogglTrackCloneApi.ValidationAttributes
{
    public class ValidateIdListAttribute : ValidationAttribute
    {
        public override bool IsValid(object? value)
        {
            if (value == null) return false;
            var idList = value as IEnumerable<int>;
            foreach(int id in idList)
            {
                if (id <= 0) return false;
            }
            return true;
        }
    }
}
