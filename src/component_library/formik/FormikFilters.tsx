import React, { useEffect, useState } from 'react';
import { Formik, FormikValues, useFormikContext } from 'formik';

function withFilters<T>(
  Component: React.ComponentType<any>,
  initialValues: T & FormikValues
) {
  const WrappedComponent = (props: React.ComponentProps<typeof Component>) => {
    return (
      <Formik
        enableReinitialize
        onSubmit={() => {}}
        initialValues={initialValues}
      >
        <Component {...props} />
      </Formik>
    );
  };

  WrappedComponent.displayName = `withFilters(${Component.displayName || Component.name || 'Component'})`;

  return WrappedComponent;
}

function useFilters<T>(defaultValues?: T): T {
  const { values, setValues } = useFormikContext<T>();
  const [debouncedValues, setDebouncedValues] = useState<T>(values);

  useEffect(() => {
    if (defaultValues) setValues(defaultValues);
  }, []);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValues(values);
    }, 300); // Adjust the delay as needed (300ms in this case)

    return () => clearTimeout(handler); // Cleanup timeout on each change
  }, [values]);

  return debouncedValues;
}

export { withFilters, useFilters };
