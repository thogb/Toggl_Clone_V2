using Microsoft.AspNetCore.Mvc.ModelBinding;
using System.ComponentModel;

namespace TogglTrackCloneApi.ModelBinders
{
    public class IntArrayModelBinder : IModelBinder
    {
        public Task BindModelAsync(ModelBindingContext bindingContext)
        {
            if (!bindingContext.ModelMetadata.IsEnumerableType)
            {
                bindingContext.Result = ModelBindingResult.Failed();
                return Task.CompletedTask;
            }

            Console.WriteLine(bindingContext.ValueProvider
                .GetValue(bindingContext.ModelName)
                .ToString());
            bindingContext.Result = ModelBindingResult.Failed();
            return Task.CompletedTask;

            /*var providedValue = bindingContext.ValueProvider
                .GetValue(bindingContext.ModelName)
                .ToString();

            if (string.IsNullOrEmpty(providedValue))
            {
                bindingContext.Result = ModelBindingResult.Success(null);
                return Task.CompletedTask;
            }

            var genericType = bindingContext.ModelType.GetTypeInfo().GenericTypeArguments[0];
            var converter = TypeDescriptor.GetConverter(genericType);

            var objectArray = providedValue.Split(new[] { "," }, StringSplitOptions.RemoveEmptyEntries)
                .Select(x => converter.ConvertFromString(x.Trim()))
                .ToArray();

            var idsArray = Array.CreateInstance(genericType, objectArray.Length);
            objectArray.CopyTo(idsArray, 0);
            bindingContext.Model = idsArray;

            bindingContext.Result = ModelBindingResult.Success(bindingContext.Model);
            return Task.CompletedTask;*/
        }
    }
}
