const shape = size => ({
  margin: '0',
  padding: '0',
  width: `${size}px`,
  height: `${size}px`,
  overflow: 'hidden'
});

const getShapeSize = (width, prefix) => ({
  [`${prefix}empty`]: { ...shape(width) },
  [`${prefix}shapeI`]: {
    ...shape(width),
    backgroundColor: '#438187'
  },
  [`${prefix}shapeJ`]: {
    ...shape(width),
    backgroundColor: '#F5C443'
  },
  [`${prefix}shapeL`]: {
    ...shape(width),
    backgroundColor: '#F5C443'
  },
  [`${prefix}shapeO`]: {
    ...shape(width),
    backgroundColor: '#3F4C4F'
  },
  [`${prefix}shapeS`]: {
    ...shape(width),
    backgroundColor: '#AA4942'
  },
  [`${prefix}shapeT`]: {
    ...shape(width),
    backgroundColor: '#E6E6E6'
  },
  [`${prefix}shapeZ`]: {
    ...shape(width),
    backgroundColor: '#AA4942'
  }
});

export default {
  ...getShapeSize(16, 'sm'),
  ...getShapeSize(25, 'md'),
  ...getShapeSize(30, 'lg')
};

export const getShapeSizes = width => {
  switch (width) {
    case 'xs':
    default:
      return 'sm';
    case 'sm':
    case 'md':
      return 'md';
    case 'lg':
    case 'xl':
      return 'lg';
  }
};
