/**
 * PageHeader Component
 * Header reutilizable para páginas con título y acciones
 */

import {} from "../ui";

const PageHeader = ({
  title,
  subtitle,
  actions,
  breadcrumbs,
  className = "",
}) => {
  return (
    <div className={`mb-6 ${className}`}>
      {/* Breadcrumbs */}
      {breadcrumbs && breadcrumbs.length > 0 && (
        <nav className='flex mb-2' aria-label='Breadcrumb'>
          <ol className='inline-flex items-center space-x-1 md:space-x-3'>
            {breadcrumbs.map((crumb, index) => (
              <li key={index} className='inline-flex items-center'>
                {index > 0 && (
                  <svg
                    className='w-3 h-3 text-gray-400 mx-1'
                    fill='currentColor'
                    viewBox='0 0 20 20'>
                    <path
                      fillRule='evenodd'
                      d='M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z'
                      clipRule='evenodd'
                    />
                  </svg>
                )}
                {crumb.link ? (
                  <a
                    href={crumb.link}
                    className='text-sm text-gray-500 hover:text-gray-700'>
                    {crumb.label}
                  </a>
                ) : (
                  <span className='text-sm text-gray-900 font-medium'>
                    {crumb.label}
                  </span>
                )}
              </li>
            ))}
          </ol>
        </nav>
      )}

      {/* Header principal */}
      <div className='flex items-start justify-between'>
        <div className='flex-1'>
          <h1 className='text-3xl font-bold text-gray-900'>{title}</h1>
          {subtitle && <p className='mt-1 text-sm text-gray-500'>{subtitle}</p>}
        </div>

        {/* Acciones */}
        {actions && (
          <div className='flex items-center space-x-3 ml-4'>{actions}</div>
        )}
      </div>
    </div>
  );
};

export default PageHeader;
