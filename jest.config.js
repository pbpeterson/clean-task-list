module.exports = {
  roots: ['node_modules', "<rootDir>/src"],
  moduleNameMapper: {
  "@/(.*)": "<rootDir>/src/$1"
  },
  preset: "ts-jest"
}