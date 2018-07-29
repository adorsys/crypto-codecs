export default interface CryptoCodec {
  encrypt(data: any): Promise<string>
  decrypt(cipher: string): Promise<any>
}
